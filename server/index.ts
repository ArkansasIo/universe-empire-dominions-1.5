import path from "path";

import { fileURLToPath } from "url";
// Fix for __filename/__dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import "./loadEnv";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { logger } from "./logger";
import { ConsoleMenu } from "./consoleMenu";
import { setupAuth } from "./basicAuth";
import { registerAccountRoutes } from "./routes-account";
import { registerAdminRoutes } from "./routes-admin";
import { registerAllianceRoutes } from "./routes-alliances";
import { registerArtifactRoutes } from "./routes-artifacts";
import { registerGuildRoutes } from "./routes-guilds";
import { registerEmpireCombatUniverseRoutes } from "./routes-empire-combat-universe";
import { registerForumRoutes } from "./routes-forums";
import { ServerStatusService } from "./services/serverStatusService";

const runtimeNodeEnv = process.env.NODE_ENV ?? "production";

const app = express();
const httpServer = createServer(app);
const statusService = ServerStatusService.getInstance();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express", level: "info" | "success" | "error" | "warn" = "info") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const icons = {
    info: "[i]",
    success: "[ok]",
    error: "[x]",
    warn: "[!]",
  };

  console.log(`${formattedTime} [${source}] ${icons[level]} ${message}`);
  
  // Also log to the structured logger
  if (level === "error") {
    logger.error("SERVER" as any, message);
  } else if (level === "warn") {
    logger.warn("SERVER" as any, message);
  } else if (level === "success") {
    logger.info("SERVER" as any, message);
  } else {
    logger.info("SERVER" as any, message);
  }
}

function formatConsoleUptime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

function formatConsoleMemory(megabytes: number) {
  return `${Math.round(megabytes)}MB`;
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      statusService.recordRequest(res.statusCode, duration);

      // Determine status category
      let statusLabel = "";
      let level: "info" | "success" | "error" | "warn" = "info";
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        statusLabel = `[${res.statusCode}]`;
        level = res.statusCode === 304 ? "info" : "success";
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        statusLabel = `[${res.statusCode}]`;
        level = "info";
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        statusLabel = `[${res.statusCode}]`;
        level = "warn";
      } else if (res.statusCode >= 500) {
        statusLabel = `[${res.statusCode}]`;
        level = "error";
      }

      // Determine speed category
      let speed = "";
      if (duration < 50) speed = "fast";
      else if (duration < 150) speed = "quick";
      else if (duration < 500) speed = "steady";
      else speed = "slow";

      // Build log message
      const method = req.method.padEnd(6);
      const endpoint = path.padEnd(35);
      let logLine = `${method} ${endpoint} ${statusLabel} ${speed} ${duration}ms`;
      
      // Add response data size info for successful responses
      if (capturedJsonResponse && res.statusCode !== 304) {
        const dataSize = JSON.stringify(capturedJsonResponse).length;
        const sizeKb = (dataSize / 1024).toFixed(1);
        logLine += ` [${sizeKb}KB]`;
      }

      log(logLine, "api", level);
    }
  });

  next();
});

import { registerSettingsRoutes } from "./routes-settings";
import { registerStatusRoutes } from "./routes-status";
import { registerDiagnosticsRoutes } from "./routes-diagnostics";
import { registerResearchRoutes } from "./routes-research";
import { registerResearchLabRoutes } from "./routes-researchlab";
import { registerTravelRoutes } from "./routes-travel";
import { registerPlanetRoutes } from "./routes-planets";
import { registerGameActionRoutes } from "./routes-gameactions";
import { registerCombatRoutes } from "./routes-combat";
import { registerEspionageRoutes } from "./routes-espionage";
import { registerResourceTradingRoutes } from "./routes-resource-trading";
import { registerLeaderboardRoutes } from "./routes-leaderboard";
import { registerGameRoutes } from "./routes-game";
import { registerMegastructureRoutes } from "./routes-megastructures";
import { registerUnitSystemsRoutes } from "./routes-unitsystems";
import { registerGovernmentLeaderRoutes } from "./routes-government-leaders";
import { registerGovernmentBuildingRoutes } from "./routes-government-buildings";
import { registerGovernmentProgressionRoutes } from "./routes-government-progression";
import { registerGalaxyRoutes } from "./routes-galaxy";
import { registerRealmRoutes } from "./routes-realms";
import { registerUniverseSeedRoutes } from "./routes-universe-seed";
import { registerLifeSupportRoutes } from "./routes-lifesupport";
import { registerLiveOpsRoutes } from "./routes-liveops";
import { registerMissingRoutes } from "./routes-missing";
import { registerExpeditionRoutes } from "./routes-expeditions";
import { registerCivilizationRoutes } from "./routes-civilization";
import { registerCivilizationSystemRoutes } from "./routes-civilization-system";
import { registerArmySystemRoutes } from "./routes-army-system";
import { registerArmyBuildingStructuresRoutes } from "./routes-army-building-structures";
import { registerUnitTaxonomyRoutes } from "./routes-unit-taxonomy";
import { registerConstructorYardRoutes } from "./routes-constructor-yard";
import turnSystemRoutes from "./routes-turnsystem";
import researchXPRoutes from "./routes-researchxp";
import recommendationsRoutes from "./routes-recommendations";
import multiplayerBonusesRoutes from "./routes-multiplayerbonuses";
import customLabRoutes from "./routes-customlabs";
import achievementRoutes from "./routes-achievements";
import autoBuyResourcesRoutes from "./routes-autobuyresources";
import tradingRoutes from "./routes-trading";
import assetsRoutes from "./routes-assets";
import ogameRoutes from "./routes-ogame";
import friendsRoutes from "./routes-friends";
import worldActionsRoutes from "./routes-worldactions";
import tradesRoutes from "./routes-trades";
import messagesRoutes from "./routes-messages";
import { seedOgameCatalogIfNeeded } from "./services/ogameCatalogService";

(async () => {
  await setupAuth(app);

  try {
    const seedSummary = await seedOgameCatalogIfNeeded();
    if (seedSummary.seeded) {
      log(
        `Seeded OGame catalog: ${seedSummary.categoryCount} categories, ${seedSummary.entryCount} entries`,
        "startup",
        "success",
      );
    }
  } catch (error) {
    log(
      `OGame catalog seed skipped: ${(error as Error).message}`,
      "startup",
      "warn",
    );
  }

  registerRoutes(app);
  registerSettingsRoutes(app);
  registerStatusRoutes(app);
  registerDiagnosticsRoutes(app);
  registerResearchRoutes(app);
  registerResearchLabRoutes(app);
  registerTravelRoutes(app);
  registerPlanetRoutes(app);
  registerGameActionRoutes(app);
  registerCombatRoutes(app);
  registerEspionageRoutes(app);
  registerResourceTradingRoutes(app);
  registerLeaderboardRoutes(app);
  registerGameRoutes(app);
  registerMegastructureRoutes(app);
  registerUnitSystemsRoutes(app);
  registerGovernmentLeaderRoutes(app);
  registerGovernmentBuildingRoutes(app);
  registerGovernmentProgressionRoutes(app);
  registerGalaxyRoutes(app);
  registerRealmRoutes(app);
  registerUniverseSeedRoutes(app);
  registerLifeSupportRoutes(app);
  registerLiveOpsRoutes(app);
  registerMissingRoutes(app);
  registerExpeditionRoutes(app);
  registerCivilizationRoutes(app);
  registerCivilizationSystemRoutes(app);
  registerArmySystemRoutes(app);
  registerArmyBuildingStructuresRoutes(app);
  registerUnitTaxonomyRoutes(app);
  registerConstructorYardRoutes(app);
  registerAccountRoutes(app);
  registerAdminRoutes(app);
  registerAllianceRoutes(app);
  registerArtifactRoutes(app);
  registerGuildRoutes(app);
  registerForumRoutes(app);
  registerEmpireCombatUniverseRoutes(app);
  // Robust validation for viewerRoot path
  const viewerBase = __dirname;
  const segment1 = typeof viewerBase === 'string' && viewerBase ? viewerBase : '';
  const segment2 = '..';
  const segment3 = 'threejs_galaxy_viewer_project';
  if (!segment1 || !segment2 || !segment3) {
    console.error('One or more path segments are invalid:', { segment1, segment2, segment3 });
    throw new Error('Invalid path segment for viewerRoot');
  }
  const viewerRoot = path.resolve(segment1, segment2, segment3);
  if (!viewerRoot || typeof viewerRoot !== 'string') {
    console.error('viewerRoot path is invalid:', viewerRoot, 'segments:', { segment1, segment2, segment3 });
    throw new Error('viewerRoot path is invalid');
  } else {
    console.log('viewerRoot resolved to:', viewerRoot);
  }
  app.get("/api/viewer/status", (_req, res) => {
    res.json({
      ok: true,
      viewerPath: "/viewer-3d/",
      appPath: "/threejs-viewer",
      mode: runtimeNodeEnv,
    });
  });
  app.use("/viewer-3d", express.static(viewerRoot));
  app.use(turnSystemRoutes);
  app.use(researchXPRoutes);
  app.use(recommendationsRoutes);
  app.use('/api/alliances', multiplayerBonusesRoutes);
  app.use('/api/labs', customLabRoutes);
  app.use('/api/achievements', achievementRoutes);
  app.use('/api/autobuy', autoBuyResourcesRoutes);
  app.use('/api/trading', tradingRoutes);
  app.use('/api/assets', assetsRoutes);
  app.use('/api/ogame', ogameRoutes);
  app.use('/api/friends', friendsRoutes);
  app.use('/api/messages', messagesRoutes);
  app.use(tradesRoutes);
  app.use(worldActionsRoutes);

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (runtimeNodeEnv === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  // Allow port override via command line argument, environment variable, or default to 5001
  let port = 5001;
  // Check for --port argument
  const portArgIndex = process.argv.findIndex(arg => arg === '--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    port = parseInt(process.argv[portArgIndex + 1], 10);
  } else if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  httpServer.listen(port, () => {
    log(`Server listening on port ${port} [${runtimeNodeEnv}]`, "startup", "success");
  });

  // Optionally start the interactive console menu
  // if (process.env.ENABLE_CONSOLE_MENU === "1" || process.env.NODE_ENV === "development") {
  //   const consoleMenu = new ConsoleMenu();
  //   await consoleMenu.start();
  // }

  // Periodically print server status
  const liveSnapshotInterval = setInterval(() => {
    (async () => {
      const metrics = await statusService.getMetrics();
      const healthLabel = metrics.health.ok ? "OK" : "FAIL";
      const healthColor = metrics.health.ok ? "\x1b[32m" : "\x1b[31m";
      const colors = { reset: "\x1b[0m", dim: "\x1b[2m" };
      logger.info(
        "SERVER",
        `${colors.dim}[status]${colors.reset} uptime=${formatConsoleUptime(metrics.cpu.uptime * 1000)} ` +
        `health=${healthColor}${healthLabel}${colors.reset} ` +
        `req=${metrics.requests.totalRequests} ` +
        `rps=${metrics.requests.requestsPerSecond.toFixed(2)} ` +
        `avg=${Math.round(metrics.requests.averageResponseTime)}ms ` +
        `cpu=${Math.round(metrics.cpu.usage)}% ` +
        `mem=${formatConsoleMemory(metrics.memory.used)}/${formatConsoleMemory(metrics.memory.total)} ` +
        `db=${metrics.database.connections}/${metrics.database.maxConnections}`
      );
    })();
  }, 60000);
  liveSnapshotInterval.unref?.();

})();

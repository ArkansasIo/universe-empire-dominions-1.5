import { pgTable, varchar, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';


const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  username: varchar('username', { length: 255 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: false }),
  updatedAt: timestamp('updated_at', { withTimezone: false }),
});

const playerItems = pgTable('player_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  playerId: varchar('player_id', { length: 36 }),
  itemType: varchar('item_type', { length: 255 }),
  itemName: varchar('item_name', { length: 255 }),
  quantity: integer('quantity'),
  createdAt: timestamp('created_at', { withTimezone: false }),
});

const auctionListings = pgTable('auction_listings', {
  id: varchar('id', { length: 36 }).primaryKey(),
  sellerId: varchar('seller_id', { length: 36 }),
  sellerName: varchar('seller_name', { length: 255 }),
  itemType: varchar('item_type', { length: 255 }),
  itemId: varchar('item_id', { length: 255 }),
  itemName: varchar('item_name', { length: 255 }),
  itemDescription: text('item_description'),
  itemRarity: varchar('item_rarity', { length: 255 }),
  itemData: jsonb('item_data'),
  quantity: integer('quantity'),
  startingPrice: integer('starting_price'),
  buyoutPrice: integer('buyout_price'),
  currentBid: integer('current_bid'),
  currentBidderId: varchar('current_bidder_id', { length: 36 }),
  currentBidderName: varchar('current_bidder_name', { length: 255 }),
  bidIncrement: integer('bid_increment'),
  bidCount: integer('bid_count'),
  duration: integer('duration'),
  expiresAt: timestamp('expires_at', { withTimezone: false }),
  completedAt: timestamp('completed_at', { withTimezone: false }),
  status: varchar('status', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: false }),
});

const auctionBids = pgTable('auction_bids', {
  id: varchar('id', { length: 36 }).primaryKey(),
  auctionId: varchar('auction_id', { length: 36 }),
  bidderId: varchar('bidder_id', { length: 36 }),
  bidderName: varchar('bidder_name', { length: 255 }),
  bidAmount: integer('bid_amount'),
  createdAt: timestamp('created_at', { withTimezone: false }),
});

const currencyTransactions = pgTable('currency_transactions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }),
  amount: integer('amount'),
  type: varchar('type', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: false }),
});


const bankTransactions = pgTable('bank_transactions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }),
  amount: integer('amount'),
  type: varchar('type', { length: 32 }),
  createdAt: timestamp('created_at', { withTimezone: false }),
});

export default {
  users,
  playerItems,
  auctionListings,
  auctionBids,
  currencyTransactions,
  bankTransactions
};

import mongoose, { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema({
  name: String,
  metric: String, // e.g. "CTR 4.1%"
  lift: String,   // e.g. "+22%"
  budget: String, // e.g. "$28.4k"
  active: { type: Boolean, default: true },
});

export const Campaign = models.Campaign || model("Campaign", CampaignSchema);
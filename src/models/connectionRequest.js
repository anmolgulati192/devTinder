const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, required: true },
    toUserId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      required: true,
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("fromUserId and toUserId cannot be the same");
    }
  next();
});

module.exports = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = { Chat };

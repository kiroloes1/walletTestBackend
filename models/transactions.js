const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
   
    },

    senderName: {
      type: String
    },

    receiverName: {
      type: String
    },

    senderPhone: {
      type: String
    },

    receiverPhone: {
      type: String
    },

    type: {
      type: String,
      required: true,
      enum: ["send", "receive","out"]
    },

    notes: {
      type: String
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    isInternalTransfer: {
      type: Boolean,
      default: false
    },

    fees: {
      type: Number,
      default: 0
    },

    ispay: {
      type: Boolean,
      default: true
    },
    refrenceId:{
      type:String,
      default:""
    },
    supplierId:{ 
      type:String,
      default:""
    },

  },
  {
    timestamps: true
  }
);



transactionSchema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = this.updatedAt || new Date();
  }

});


const transactionModel = mongoose.model(
  "Transaction",
  transactionSchema
);

module.exports = transactionModel;
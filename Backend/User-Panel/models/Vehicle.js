const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  vehicleType: {
    type: String,
    enum: ["2wheel", "4wheel"],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    index: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: ""
  },
  model: {
    type: String,
    default: ""
  }
}, { timestamps: true });

// Ensure only one primary vehicle per user
vehicleSchema.pre("save", async function(next) {
  if (this.isPrimary && this.isModified("isPrimary")) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isPrimary: false }
    );
  }
  next();
});

module.exports = mongoose.model("Vehicle", vehicleSchema);

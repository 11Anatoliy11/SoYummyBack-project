const { Schema, model, default: mongoose } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for recipe"],
    },

    category: {
      type: String,
      required: [true, "Set category for recipe"],
    },

    area: {
      type: String,
    },

    instructions: {
      type: String,
      required: [true, "Set instructions for recipe"],
    },

    description: {
      type: String,
    },

    thumb: {
      type: String,
      // required: [true, "Set image for recipe"],
    },

    preview: {
      type: String,
    },

    time: {
      type: String,
      required: true,
    },

    youtube: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    ingredients: {
      type: Array,
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema);

module.exports = Recipe;

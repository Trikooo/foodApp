const productValidationSchema = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Description is required",
    },
  },
  price: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Price is required",
    },
  },
  brand: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Brand is required",
    },
  },
  category: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Category is required",
    },
  },
};

module.exports = productValidationSchema;
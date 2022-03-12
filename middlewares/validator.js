const { check, validationResult } = require("express-validator")

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is missing!")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be bettwen 3 and 30 characters!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isString()
    .isLength({ min: 3 })
    .withMessage(
      "Password needs at least 3 characters... that's not a tall ask!"
    )
    .not()
    .isLowercase()
    .withMessage(
      "Password must have one uppercase, lowercase, and number or symbol!"
    )
    .not()
    .isUppercase()
    .withMessage(
      "Password must have one uppercase, lowercase, and number or symbol!"
    )
    .not()
    .isNumeric()
    .withMessage(
      "Password must have one uppercase, lowercase, and number or symbol!"
    )
    .not()
    .isAlpha()
    .withMessage(
      "Password must have one uppercase, lowercase, and number or symbol!"
    ),
]

exports.validate = (req, res, next) => {
  const error = validationResult(req).array()
  if (!error.length) return next()

  res.status(400).json({ success: false, error: error[0].msg })
}

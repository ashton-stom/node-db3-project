const schemes = require('./scheme-model.js')


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const schemeId = schemes.findById(req.params.id)
  if (!schemeId) {
    res.status(404).json({ message: `Scheme with scheme_id ${req.params.id} not found` })
  } else {
    next();
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;
  if (!schemeName || typeof schemeName != "string" || schemeName == "") {
    res.status(400).json({ message: 'Invalid scheme_name' })
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const checkInstructions = req.body.instructions;
  const step = req.body.step_number
  if (!checkInstructions || typeof checkInstructions != "string" || checkInstructions == "" || !step || typeof step != "number" || step < 1) {
    res.status(400).json({ message: 'Invalid step.' })
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

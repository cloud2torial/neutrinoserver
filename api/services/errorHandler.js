module.exports = function handleValidationError(err, res){
    const messages = []
    for (let field in err.errors) {
      messages.push(err.errors[field].message)
      console.log(err.errors[field].message)
    }
    res.status(422).json({ messages })
  }
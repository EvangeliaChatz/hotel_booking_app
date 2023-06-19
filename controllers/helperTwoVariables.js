

Handlebars.registerHelper('and', function() {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();
  
    for (var i = 0; i < args.length; i++) {
      if (!args[i]) {
        return false;
      }
    }
  
    return options.fn(this);
  });
  // export default Handlebars;
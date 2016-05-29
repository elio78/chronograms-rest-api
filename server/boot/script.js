module.exports = function(app) {
var MongoDB = app.dataSources.MongoDB;

MongoDB.automigrate('Customer', function(err) {
   if (err) throw (err);
   var Customer = app.models.Customer;

   Customer.create([
    {username: 'Admin', email: 'elio@canale-parola.eu', password: 'abcdef', id:'user01'},
    {username: 'elio', email: 'elio@canale-parola.eu', password: 'Ce1mdphs', id:'user02'}
  ], function(err, users) {
    if (err) return cb(err);
     var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
       //make admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw (err);
      });
    });
  });
});
    
MongoDB.automigrate('chronograms', function(err) {
   if (err) throw (err);
   var chronogram = app.models.chronograms;

   chronogram.create([
    {
        "name": "chronogram one",
        "description": "Duobus Tarquinium Curi enim quippe altero et non memoriam propter qui non propter probitatem Sp",
        "plannedStartDate": "2016-05-10",
        "effectiveStartDate": "2016-05-10",
        "status": "started",
        "state": "string",
        "plannedDuration": "150",
        "effectiveDuration": 0,
        "id":"chrono01",
        "customerId":"user02"
    },
    {
        "name": "Chronogram two",
        "description": "Esse docet beate ac levitate licentia nati enim lapsorum ut nati ad convenit coetuum ad.",
        "plannedStartDate": "2016-05-10",
        "effectiveStartDate": "2016-05-10",
        "status": "defined",
        "state": "defined",
        "plannedDuration": "160",
        "effectiveDuration": 0,
        "id":"chrono02",
        "customerId":"user02"
    }
  ], function(err, chronograms) {
    if (err) return cb(err);
  });
});
MongoDB.automigrate('tasks', function(err) {
   if (err) throw (err);
   var task = app.models.tasks;

   task.create([
    {
        "name": "task one",
        "description": "Egeat in quisque Africanus in auxit maxime suaque sed habebat quidem de nulla moribus meis.",
        "effectiveStartDate": "2016-05-10T10:20:00.000Z",
        "status": "terminated",
        "state": "terminated",
        "effectiveDuration": 30,
        "criticity": 0,
        "executionOrder": 1,
        "responsibles": [
            "user02"
        ],
        "history": [
            {}
        ],
        "plannedDuration": 30,
        "plannedStartDate": "2016-05-10T10:00:00.000Z",
        "prerequisites": [
            ""
        ],
        "id": "task01",
        "chronogramsId": "chrono01",
    },
    {
        "name": "task two",
        "description": "Esse docet beate ac levitate licentia nati enim lapsorum ut nati ad convenit coetuum ad.",
        "effectiveStartDate": "2016-05-10T10:50:00.000Z",
        "status": "started",
        "state": "started",
        "effectiveDuration": 30,
        "criticity": 0,
        "executionOrder": 2,
        "responsibles": [
            "user02"
        ],
        "history": [
            {}
        ],
        "plannedDuration": 30,
        "plannedStartDate": "2016-05-10T10:30:00.000Z",
        "prerequisites": [
            "task01"
        ],
        "id": "task02",
        "chronogramsId": "chrono01",
    }
   
  ], function(err, tasks) {
    if (err) return cb(err);
  });
});

MongoDB.automigrate('histories', function(err) {
   if (err) throw (err);
   var history = app.models.histories;

   history.create([
    {
        "description": "Haecque aviditate montibus avertebant cornuta impeditis etiam eisdem etiam cum viles noctes in et aviditate.",
        "id": "histo01",
        "tasksId": "task01",
    },
    {
        "description": "Vel a emisit intromissa poposcerat his iam exultans super quoque alios quoque ad palatium poposcerat.",
        "id": "histo02",
        "tasksId": "task01",
    },
   
  ], function(err, histories) {
    if (err) return cb(err);
  });
});
};
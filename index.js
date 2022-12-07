const express = require('express'),
app = express(),
port = 3000;


const data_users = [];
ids = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/home',(req, res) => {

  res.json(data_users)

});

app.get("/home/:id",(req, res) =>{
  const { id }= req.params;
  

  const users = data_users.find((i) => i.id == id);

  if(users){
    res.json({
      data: users
    })
  }
  else{
    res.json({
      code: 400,
      error: "ID Not Found"
    })
  }
});

app.post('/home', (req, res) => {
  const { names } = req.body;
  
  if(!names || names.trim().length === 0){
    return res.status(400).json({
      code: 400,
      error: `Name is requerid`
    })
  }

  const users = data_users.find((findUser) => findUser.names === names)
  if(users){
    return res.status(400).json({
      code: 400,
      error: `Name: ${names} is alredy used`
    })
  }

  ids+=1;
  const new_user = { id: ids, names };
  const user = new_user;
  data_users.push(new_user)

  res.json({
    code: 200,
    data: new_user})
});

app.put("/home/:id", (req, res) => {
  const { id } = req.params;
  const { names } = req.body;

  if (!id) {
    return res.status(400).json({
        code: 400,
        error: "ID can't be empty"
    });
  }

  let users = data_users.find((findID) => findID.id == id)
  if(!users){
    return res.status(400).json({
      code:400,
      error: "ID Not Found"
    })
  }
  

  if(!names || names.trim().length === 0 ){
    return res.status(400).json({
      code: 400,
      error: "Name can't be Empty"
    });
  }

  const findNames = data_users.find((findUser) => findUser.names === names)
  if(findNames){
  if(findNames.names === names && findNames.id !== id) {
   return res.status(400).json({
     code: 400,
     error: `${names} is alredy used`
    });
  }
  } 

  users.names = names;
  res.json({
    message: `ID: ${id} was updated`
  });

});

app.delete("/home/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return response.status(400).json({
        code: 400,
        error: "ID can't be empty"
    });
}


  const users = data_users.findIndex((findUser) => findUser.id == id)
  if( users >=0){
    data_users.splice(users , 1);

    res.status(200).json({
      code:200,
      message: `${id} was deleted succefully`
    });
  }

  res.status(400).json({
    code: 400,
    error: "ID Not Found"
  });

});

app.listen(port, () =>{
  console.log(`This port is: ${port}, is running!`)
});
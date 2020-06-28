const Client = require('pg').Client
const client = new Client({
    user: "darkside",
    password: "DS01",
    host: "2.0.0.195",
    port: 5433,
    database: "darkside"
})

execute()

async function execute(){
try {

    await client.connect()
    await client.query("BEGIN")
    await client.query("insert into teszt_tabla values ($1, $2, $3)", [5, '100', '1'])
    console.log("Inserted a new row")
    await client.query("COMMIT")
}
catch(ex){
    console.log('Failed' + ex)
}
finally{
    await client.end()
    console.log("cleaned.")
}
}
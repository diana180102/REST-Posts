import "dotenv/config";

export const config = {
    db:{
        host: process.env["PGHOST"],
        port: Number(process.env["PGPORT"]),
        user: process.env["PGUSER"],
        password: process.env["PGPASSWORD"],
        database: process.env["PGDATABASE"],
        
        }, 
    server: {
         port: process.env['PORT'] || 3000,
    }

}





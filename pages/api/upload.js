  import multiparty from 'multiparty'
  import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
  import fs from 'fs'
  import mime from'mime-types'
import { moongooseConnect } from '@/lib/mongoose'
import {isAdminRequest } from './auth/[...nextauth]'
  const handle = async(req,res)=>{
    moongooseConnect()
    await isAdminRequest(req,res)
    const form = new multiparty.Form()
    form.parse(req, async(err,fields,files)=>{
       
        //console.log(files.file.length) data inside files are like file:[{fieldName: , originalFilename: etcss}]
        const client = new S3Client({
            region:'ap-south-1',
            credentials:{
                accessKeyId:process.env.S3_ACCESS_KEY,
                secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
            }})

            const links = []
            for(const file of files.file){
                const ext = file.originalFilename.split('.').pop()
                const newFileName = Date.now() +'.'+ ext
                await client.send(new PutObjectCommand({
                    Bucket:'mobilemart',
                    Key:newFileName,
                    Body:fs.readFileSync(file.path),
                    ACL:'public-read',
                    ContentType: mime.lookup(file.path)
                }))

                const link = `https://mobilemart.s3.amazonaws.com/${newFileName}`
                links.push(link)

            }

        res.json({links})
    })

}

export const config={
    api:{bodyParser:false}
}




export default handle;






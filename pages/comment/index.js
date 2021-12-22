// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'GET'){
        res.status(200).json({ name: 'John Doe' })
    } else if (req.method === 'POST'){
        const comment = req.body.comment
        const newComment = {
            Content : comment,
            Date : String(Date.now()),
            Point : 0,
            // post : 
            // author : 
        }
    }
  }
  

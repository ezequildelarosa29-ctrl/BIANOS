export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({ok:false,message:"POST only"});
  const url=process.env.APPS_SCRIPT_URL;
  if(!url) return res.status(500).json({ok:false,message:"APPS_SCRIPT_URL is not configured in Vercel."});
  try{
    const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(req.body)});
    const text=await r.text();
    res.status(r.status).setHeader("Content-Type","application/json").send(text);
  }catch(e){res.status(502).json({ok:false,message:"Backend connection failed."})}
}
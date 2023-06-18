
function checkSignedIn(req,res,next){
    if(req.session.signedIn){
        next()
    }else{
        console.log('Not signed in')
        res.redirect(req.get('referer'))
    }
}

export default checkSignedIn
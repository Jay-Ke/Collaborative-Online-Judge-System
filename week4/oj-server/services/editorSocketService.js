const redisClient=require('../modules/redisClient');
const TIMEOUT_IN_SECOND=3600;


module.exports=function(io){

    const collaborations={};
// {
//     1:{
//         participants:[123,234]
//     }
//     2:{
//         participants:[]
//     }
// }
    const sessionPath='/temp_sessions/';
    const socketIdToSessionId={};

    io.on('connection',(socket)=>{
        //console.log(socket);
        const sessionId=socket.handshake.query['sessionId'];
        // console.log(message);
        socketIdToSessionId[socket.id]=sessionId;
        
        // if (!(sessionId in collaborations)){
        //     collaborations[sessionId]={
        //         'participants':[]
        //     };
        // }
        // collaborations[sessionId]['participants'].push(socket.id);
        if (sessionId in collaborations){
            collaborations[sessionId]['participants'].push(socket.id);
        }
        else{
            redisClient.get(sessionPath+'/'+sessionId,(data)=>{
                if (data){
                    collaborations[sessionId]={
                        'cachedInstructions':JSON.stringify(data),
                        'participants':[]
                    }
                }else{
                    collaborations[sessionId]={
                        'cachedInstructions':[],
                        'participants':[]
                    }
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        socket.on('change',delta=>{
            const sessionId=socketIdToSessionId[socket.id];
            if (sessionId in collaborations){
                collaborations[sessionId]['cachedInstructions'].push(['change',delta,Date.now()]);
            }
            if (sessionId in collaborations){
                const participants=collaborations[sessionId]['participants'];
                for (let participant of participants){
                    if (socket.id!==participant){
                        io.to(participant).emit('change',delta);
                    }
                }
            }
            else{
                console.log('errors');
            }
        })
        // io.to(socket.id).emit('m','hahaha from server');

        socket.on('restoreBuffer',()=>{
            const sessionid=socketIdToSessionId[socket.id];
            const instructions=collaborations[sessionid]['cachedInstructions'];

            if (sessionid in collaborations){
                for (let instruction of instructions){
                    socket.emit(instruction[0],instruction[1]);
                }
            }
        });

        socket.on('disconnect',()=>{
            const sessionid=socketIdToSessionId[socket.id];
            let foundAndRemove=false;

            if (sessionid in collaborations){
                const participants=collaborations[sessionid]['participants'];
                const index=participants.indexOf(socket.id);
                if (index>=0){
                    participants.slice(index,1);
                    foundAndRemove=true;
                    if (participants.length===0){
                        const key=sessionPath+'/'+sessionid;
                        const value=JSON.stringify(collaborations[sessionid]['cachedInstructions']);
                        redisClient.set(key,value,redisClient.redisPrint);
                        redisClient.expire(key,TIMEOUT_IN_SECOND);
                        delete collaborations[sessionid];
                    }
                }
            }
            if (!foundAndRemove){
                console.log('You are the first people');
            }
        })
    });
}
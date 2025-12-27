import {Sequelize} from 'sequelize';

export const sequelize_config = new Sequelize('blogapp3','root','16783',
{host:'localhost',
dialect:'mysql'}
)


export const dbconnection = async()=>{
  try{
    await sequelize_config.sync({ alert:true , force:false })
    console.log('connected Successfully')
  }catch(err){
    console.log('Failed to Connect to blogapp3',err)
  }
}
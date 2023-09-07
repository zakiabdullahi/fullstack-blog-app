import mongoose from 'mongoose'
import { port } from './config.js'
import { DbUrl } from './config.js'
import chalk from 'chalk'

const connectDB = async () => {


    try {

        await mongoose.connect(DbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`${chalk.green('Connected ')}to database`)

    } catch (err) {

        console.log(`${chalk.red('Error')} connecting to database`, err)
        process.exit(1)
    }
}


export default connectDB
import chalk from "chalk"
import { app } from "./app"

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log(chalk.bgGreen("HTTP Serve Running 🚀🚀"))
})

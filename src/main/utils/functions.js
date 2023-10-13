export const getF = (event, args) => {
  console.log(args)
  event.sender.send('send', args)
}

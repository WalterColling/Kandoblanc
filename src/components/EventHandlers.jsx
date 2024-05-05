export const eventHandler = (event) => {
  console.log(event.object.name);
  event.stopPropagation(); // Prevents the event from bubbling up the event chain
};

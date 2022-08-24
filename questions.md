### 👉 What is the difference between Component and PureComponent? give an example where it might break my app.

The primary difference in **PureComponent** when props or state changes, **PureComponent** will do a _shallow comparison_ on both props and state, whereas **Component** won't compare current props and state to next out of the box, and then the component will re-render by default whenever _shouldComponentUpdate_ is called.

### 👉 Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

I think because you can disastrously have re-render of a bunch of components responding a context side-effect, making the system slow and consuming a lot of memory.

### 👉 Describe 3 ways to pass information from a component to its PARENT.

- Using callback props
- Using Context
- Using a third library such Redux

### 👉 Give 2 ways to prevent components from re-rendering.

- Using `React.memo`
- Using the hook `useCallback`
- Set the correct array dependency on `useEffect()`

### 👉 What is a fragment and why do we need it? Give an example where it might break my app.

- `Fragment` is a way to group a list of children without extra nodes to the DOM.
- Imagine your application is growing and you decide to return always one `<div>` rather than Fragment, you are creating a problem for the browser, which will consume more memory, adding more nodes in the DOM leverage the browser and the application to become slowly.

### 👉 Give 3 examples of the HOC pattern.

_High Order Component_ is when sometimes you want to share the same logical with a few components, some cases of use:

- Add some equal styles in a component
- Add Auth logic in a component
- Add some events within a component, such _hover_

```
function withStyles(Component) {
  return props => {
    const style = { margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

### 👉 What's the difference in handling exceptions in promises, callbacks and async...await.

- In all these cases we can use a `try...catch()` logical, the difference is when we want to deal directly with a Promisse, we can use `.then()` to success case and `.catch()` to capture errors.
- In the case of async functions, we can use a syntax sugar with `try...catch()`

```
async function getSomething() {
    throws Error();
}

async function myFunc() {
    try {
        await getSomething();
    } catch (e) {
        console.log("Something wrong happens", e);
    }
}
```

This is a sintax sugar to `catch` on promises

```
getSomething().catch(e => {
    console.log("Something wrong happens", e);
});
```

### 👉 How many arguments does setState take and why is it async.

There is two arguments on setState, the first is the `updater`, on object with `(prevState, props)` where `prevState` is the current state immutable and `props` the value coming from the set function, the next one is a callback, used when you need ensure which something needs to be execute only after the update of the state, it is a feature vital because the setState is asynchronous.

### 👉 List the steps needed to migrate a Class to Function Component.

- Basically, you need to transform all life cycle events used in a class to use hooks, especially the `useEffect`, which is responsible to make the same effect of events such as `componentDidMount` and `componentWillUnmount`

### 👉 List a few ways styles can be used with components.

- Inline style using JSX
- Using a individual file for each component
- Using a global file style wrappring all the application
- Using CSS-in-JS with a library like styled-components

# How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML`

```
<div
  className='title'
  dangerouslySetInnerHTML={{
    __html: item.title
  }}
/>
```

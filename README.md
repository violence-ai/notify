# Notify plugin

### Push notification like on iphone

<img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif">
![alt text](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif)

<hr>

# Import to your project

```typescript
import Notify from "beauty-notify"
```

# Usage

```typescript
// creating instance
const notify = new Notify({
    timeout: 2500
})

// push notification
notify.push({
    title: 'Your title',
    text: 'An example of a long notice for your site'
})

```

# Options

```typescript
// You can choose the desired animation function provided out of the box
// You can also create your own animation (see below "Creating your own animation"
const { animateLikeOnIphone } = Notify.animateFunctions
// You can get base styles for further overriding (see "Style Description" below)
const defaultStyles = Notify.defaultStyles

const options = {
    // Time after which the fade animation will start (required)
    timeout: 2500,
    // Fade in/out animation (optional)
    // Default: animateLikeOnIphone
    animateFunction: animateLikeOnIphone,
    // Overriding styles (optional)
    styles: {
        ...defaultStyles,
        root: {
            position: 'fixed',
            top: `20px`,
            left: '40px',
            width: `200px`,
        },
        title: {
            fontWeight: 'bold',
            color: 'blue'
        },
        close: {
            ...defaultStyles.close,
            background: 'green'
        }
    },
}

const notify = new Notify(options)
```

# Create your own animation

```typescript
/**
 * You can see an example of the finished animation code in the current repository at:
 * /src/animate-functions/animateLikeOnIphone.t
 */

const yourAnimateName = {

    /**
     * Before the element is placed in the DOM.
     * Here you need to set up basic styles before starting the animation
     */
    beforeInsert(message, done) {
        // your code
        done()
    },

    /**
     * After placing an element in the DOM.
     * Here you need to set up styles for the appearance animation
     */
    afterInsert(message, done) {
        // your code
        done()
    },

    /**
     * After the animation is over.
     * You may need to apply final styles after the animation ends
     */
    afterInAnimateEnd(message, done) {
        // your code
        done()
    },

    /**
     * After the display time is up.
     * Prepare the base styles before starting the fade animation
     */
    startOutAnimate(message, done) {
        // your code
        done()
    }
}
```
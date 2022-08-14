# Smooth Notify

### Push notifications with smooth animation

<img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif">

<hr>

# Import to your project

```typescript
import Notify from "beauty-notify"
```

# Usage

```typescript
// creating instance
const notify = new Notify()

// push notification
notify.push({
    title: 'Your title',
    text: 'An example of a long notice for your site'
})

```

# Options

```typescript
// You can choose the desired animation function provided out of the box
// You can also create your own animation (see below "Creating your own animation")
const { iphone, slideAngle, slideRight } = Notify.animateFunctions
// You can get base styles for further overriding (see "Style Description" below)
const defaultStyles = Notify.defaultStyles

const options = {
    // Time after which the fade animation will start (optional, default: 5000ms)
    timeout: 5000,
    // Fade in/out animation (optional, default: 'iphone')
    animateFunction: iphone,
    // Gap between notifications (optional, default: 20)
    gap: 20,
    // Time for which notifications move between each other when appearing and disappearing (optional, default: 500)
    elementShiftTime: 500,
    // Overriding styles (optional, default: print to console to view console.log(Notify.defaultStyles))
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
 * /src/animate-functions/iphone.ts
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
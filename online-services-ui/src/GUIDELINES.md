The document describes the guidelines for the frontend development. 

## TypeScript

* Avoid `any` type
* Use ES6 classes when you want to do use type checking or you want to create instances with `new` or `Object.create`, in other cases use interfaces.
* Learn the [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) styleguide on TypeScript website.

## Code structure 

* Follow the [Angular Style Guide](https://angular.io/guide/styleguide) for naming and structure.
* When computations or complex mappings are needed, try to use pure functions. They are easier to test. 
* Components have to be dumb and contain mainly the representation logic. As soon as you see that one of the methods of your component performs mutations/conversions/preprocessing of the data, consider to put that into a service. 

## CSS and HTML

### General principles

* Try to write as little CSS code as possible. Use bootstrap classes wherever possible.
* Use CSS classes according to [BEM methodology](http://getbem.com/naming/).
* Use `data-test` attributes for e2e tests, as described [here](https://medium.com/@colecodes/test-your-dom-with-data-attributes-44fccc43ed4b).
* If you have a lot of html attributes, stack them. For example, this is less readable: 

```html

<a [routerLink]="" *ngIf="articles.length < totalItems" (click)="onClickReadMore()"
       class="btn btn-primary btn-lg active" role="button" aria-pressed="true">{{'news.list.more' | translate}}
    </a>
```
and this is more readable: 
```html
<a [routerLink]=""
   *ngIf="articles.length < totalItems" 
   (click)="onClickReadMore()"
   class="btn btn-primary btn-lg active"
   role="button"
   aria-pressed="true">
   {{'news.list.more' | translate}}
</a>
``` 

In IntelliJ IDEA you can make it part of a code style by going to `Settings > Editor > Code style > HTML > Other > Wrap attribute > Wrap always`. 
   
### Bootstrap, 3rd party libs and custom components

Should I use the existing component, change its CSS or wrap it in my own Angular Component Wrapper? 

* If there's a ng-bootstrap component that provides the same functions but doesn't look the same as needed: us ng-bootstrap component, create a new scss file in `commons` directory and style it there. Don't create angular wrapper for it.
* If there's no 3rd party component, or it has missing js-functionality, create own component in `shared` folder forking the exising one, or from scratch. 
 
## Unit tests

* Test data mutations/conversions as pure functions, preferably moving them to services. Test the edge cases.
* If you just found and fixed the bug, consider adding the test to make sure the bug won't appear again. 
* Use [Jasmine matchers](https://github.com/JamieMason/Jasmine-Matchers) to avoid vague error messages: 

```js
expect(cycleWheels % 2 === 0).toEqual(true); // bad, because produces "expected false to be true" message
expect(cycleWheels).toBeEvenNumber(); //better, produces "expected 3 to be even number message"
```
* In cases the test expectation occurs often in the test cases, write your own matchers to improve readability

### Redundant tests 

Don't test the angular core. Consider the component with the following template: 

```html
<h1 class="details__title"> Details</h1>
<div *ngFor="let detail of details">{{detail.name}}</div>
```

For this component it doesn't make sense to write the following test: 

```js
it('should display the h1 details', async () => {
        const relatedArticleElements: any[] = nativeElement.querySelectorAll('.details__title');
        expect(relatedArticleElements.text).toBe("Details");
    });
```

### Fragile tests

Make sure your tests are not fragile. Changes in html layout or visual design normally should not lead to tests break.   

* Avoid 

* Avoid complex selectors in tests, because they are dependent of your HTML structure. For example, this selector in your test is bad:

```js
const mainNavLink = nativeElement.querySelector('.news-details > div > a');

```

In this case it makes sense to add a class to that link and retrieve it like this: 
```js
const mainNavLink = nativeElement.querySelector('.news-detail__main-nav-link');

```

* Avoid tag selectors if you suspect that the tag can be changed later for decorative purposes. For example, it's usually a bad idea to use `h1`, `h2`, `h3` selectors, because we can always decide to change the level of the header of the element. It's also not nice to use `a`, `div`, or `button` selectors, because in Bootstrap these two elements are used interchangeably. When in doubt, always use custom class selector.  
 
* Avoid using decorative CSS classes in selectors in your tests, e.g. the classes of Material Design or Bootstrap. For example this code allows us to select green button and then use it in our test: 

```
js 
nativeElement.querySelectorAll('a.btn.btn-success')
``` 

The `btn-success` class belongs to bootstrap. In case we decide to use blue buttons instead of green buttons, our test will fail. It will also break if we decide to replace `<a>` tag with `<button>` tag. This is unnecessary fragility. It's better to identify the button with our own semantic class `myDialog___close-dialog-button`, and select it like this:

```js 
nativeElement.querySelectorAll('myDialog___close-dialog-button')
```

* We rarely use array indexes in the tests. For example, here, apparently we're trying to check if we have the link that points to `/news` in the array of links: 

```expect(links.childNodes[3].text).toBe('/news');```

Unless the order of links never change and this order is really important, we can use more rough methods of checking this fact. For example, we can just check the `innerHTML`
property of the `links`

Good reading: [Making your UI tests resilient to change
](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269)

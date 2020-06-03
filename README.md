# Queue Smarter
> Queue virtually, avoid standing in line and practice social distancing when queuing


## Sample

![all views](/docs/_media/all-views.png)


## About

"Queue Smarter" is a project by Team Queue - this project was created as an effort in the _GetSmarter_ Systems and Technology department's hackathon event in May 2020. The theme was theme "In case of emergency".

In keeping with the theme and the need for physical distancing during Covid-19 and lockdown, we decided on a virtual queueing system. This lets people join an online queue for a real shop, such as Clicks pharmacy, without having to actually stand in a physical line. We added a "teller" admin view for a staff member to manage people entering the store if they are at the start of the queue.

Our application made a prototype with limited functionality, based on the time available. But we hope that other organizations can take our idea further and partner with retailers, malls and pharmacies to help people queue while avoiding congestion.

The application makes use of Node.js - as required by the hackathon rules. We made the frontend an Vue.js app served on Netlify and the backend is an Express API running on Heroku.


## Live site

- Frontend: [queue-smarter.netlify.app](https://queue-smarter.netlify.app/)
- REST API backend: [hackathon2u-queue.herokuapp.com](https://hackathon2u-queue.herokuapp.com/)

These can also be access on a local dev server.


## Application views

### Join a queue

- [homepage](https://queue-smarter.netlify.app/)

Enter one of the supported queue names - `clicks`, `woolworths` or `picknpay`.

<p align="center">
    <img src="/docs/_media/join.png" width="300" alt="join">
</p>


### Wait in a queue

You will be redirected to one of these queues.

- [clicks](https://queue-smarter.netlify.app/queue/clicks)
- [woolworths](https://queue-smarter.netlify.app/queue/woolworths)
- [picknpay](https://queue-smarter.netlify.app/queue/picknpay)

<p align="center">
    <img src="/docs/_media/joined.png" width="300" alt="joined">
</p>


### Admin view

These are teller views for a shop staff member to let people into the store if they are at the front of the virtual queue - they will have to valid their identity such as using the random ID supplied to each user.


- [clicks](https://queue-smarter.netlify.app/teller/queue/clicks)
- [woolworths](https://queue-smarter.netlify.app/teller/queue/woolworths)
- [picknpay](https://queue-smarter.netlify.app/teller/queue/picknpay)

These are public - authorization would be enforced if this was a production app.

<p align="center">
    <img src="/docs/_media/teller.png" width="300" alt="teller">
</p>


## Mission

In a world where social and physical distancing has become the new norm, QueueSmarter seeks to reduce the need to physically queue outside storefronts. By enabling users to queue virtually, we empower them to both take control of their time, as well as limit their risk of exposure.


## Target Audience

The service should be open to all, with only barrier to entry being a smartphone. Whilst online deliveries are commonplace, many still chose to shop in-person. Retailers also benefit from the service, since it gives them an effective means to control crowds as well as avoid disgruntled patrons having to stand and queue for extended periods.


## Use-case

This application is aimed at adding a tool for customers to use to queue virtually for shopping or for medication, without having to be surrounded by crowds or stand in long queues, especially when there is a disease outbreak.

When a customer is in a mall and need to queue to enter grocery which is implementing a queuing system, you can add yourself to the queue while doing your shopping. Then watch your status on the site to see where you're next.

This also works if you are further away and want to join the queue and then drive.

If you are in a pharmacy, you can join the virtual queue for the prescription counter and carry on shopping with your virtual ticket number until you're next.

There are multiple queues to join, for each store.

A staff member at the store will administer the queue to keep track of who can enter and if someone is not where ready and should be bumped down or off the queue.


## Documentation

- [Installation](/docs/installation.md)
- [Usage](/docs/usage.md)
- [Resources](/docs/resources.md)


## Limitations and future development

- Authentication and registrations of users could be done.
- Use QR code or physical ID or similar technology to help with verifying who someone and that they are in the store.
- Implement policy and logic for misbehaving customers or customers who need to get bumped off the queue.
- Add scheduling so people can be in request to be in a queue later in the day and get notified they are in.
- Separate control for the admin view can be enforced.
- Use Redis on Heroku for a persistent distributed queueing system and hook the backend server into that, instead of using the in-memory Node.js queues.
- Use WebSockets for continuous streams, to avoid using REST API and polling.
- Add geo-location to recommend people to queues based on their proximity. And to tell people when to leave for the store, based on their distance away and how many people in the queue.


## License

Released under [MIT](/LICENSE).

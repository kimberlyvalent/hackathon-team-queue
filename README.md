# Queue Smarter
> Queue virtually, avoid standing in line and practice social distancing when queing_


_GetSmarter Hackathon project for May 2020 - "In case of emergency"_


## Live site

[queue-smarter.netlify.app](https://queue-smarter.netlify.app/)


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

- [Installation](docs/installation.md)
- [Usage](docs/usage.md)
- [Resources](docs/resources.md)


## Limitations and future development

- Authentication and registrations of users could be done.
- Use QR code or physical ID or similar technology to help with verifying who someone and that they are in the store.
- Implement policy and logic for misbehaving customers or customers who need to get bumped off the queue.
- Add scheduling so people can be in request to be in a queue later in the day and get notified they are in.
- Separate control for the admin view can be enforced.
- Use Redis on Heroku for a persistent distributed queueing system and hook the backend server into that, instead of using the in-memory NodeJS queues.
- Use WebSockets for continuous streams, to avoid using REST API and polling.
- Add geo-location to recommend people to queues based on their proximity. And to tell people when to leave for the store, based on their distance away and how many people in the queue.


## License

Released under [MIT](/LICENSE).

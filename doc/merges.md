# merge history

All of the original code snapshots were taken on November 11, 2015, and included:

* [node-postgres v.4.4.3](https://github.com/brianc/node-postgres/tree/v4.4.3)
* [pg-query-stream v.0.7.0](https://github.com/brianc/node-pg-query-stream/tree/v0.7.0)
* [pg-cursor v.1.0.0](https://github.com/brianc/node-pg-cursor/tree/v1.0.0)
* [pg-types v.1.10.0](https://github.com/brianc/node-pg-types/tree/v1.10.0)

Below is the history of synchronizing code changes from that date on into `pg-core`.
And if you know of any important change that haven't been merged yet, please either
open a new issue, or better yet - create a PR.

Date  | Source Package | Source Commit(s) | Merged in Version
:--------: | :----------: | :----------: | :----------:
13-Oct-15 | node-postgres | [defaults.js: fix typo in comment](https://github.com/brianc/node-postgres/commit/ee210369622bb662e918a979d81866b72a0011ad) | [v.0.1.8](https://github.com/vitaly-t/pg-core/releases/tag/v.0.1.8) 
13-Oct-15 | pg-query-stream | [avoid race when stream closed while fetching](https://github.com/brianc/node-pg-query-stream/commit/ca21462f1bf8765ff6b16fff8b26842e95fa0e6a) | [v.0.1.9](https://github.com/vitaly-t/pg-core/releases/tag/v.0.1.9) 

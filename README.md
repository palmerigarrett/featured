### Featured

# This is a custom implementation of a feature flag framework,

The goal is to implement feature flags that use REST for CRUD operations. The feature flags are stored in a database and are retrieved from the database when the application starts.

Consuming applications will use sockets to listen for changes to the feature flags. When a change is detected, the application will update the feature flags in memory.
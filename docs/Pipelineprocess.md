
# Pipeline Processing

CircleCI pipelines are the highest-level unit of work, encompassing a project’s full .circleci/config.yml file. Pipelines include our workflows, which coordinate our jobs. They have a fixed, linear lifecycle, and are associated with a specific actor. Pipelines trigger when a change is pushed to a project that has a CircleCI configuration file included, and can also be scheduled, triggered manually through the CircleCI app and GitHub
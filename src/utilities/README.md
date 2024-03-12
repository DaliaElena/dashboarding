# DBOS Documentation

## Library Importation

```python
from dbos.dbos import *
import dbos.dbos as dbos
```

## Method List

### **_1. Dynatrace Integration_**

#### Code

```python
dbos.dynatraceHosts()
```

#### Response

Generates a dataframe with the table of Host entities (columns: "entityID", "type", "displayName").

---

#### Code

```python
dbos.dynatraceEntitiesTypes()
```

#### Response

Generates a dataframe with the table of entities types (columns: "type", "displayName", "dimensionKey").

---

#### Code

```python
dbos.dynatraceApplications()
```

#### Response

Generates a dataframe with the table of application entities (columns: "entityID", "type", "displayName").

---

#### Code

```python
dbos.dynatraceServices()
```

#### Response

Generates a dataframe with the table of service entities (columns: "entityID", "type", "displayName").

---

#### Code

```python
dbos.dynatraceServiceMethods()
```

#### Response

Generates a dataframe with the table of service method entities (columns: "entityID", "type", "displayName").

---

#### Code

```python
dbos.dynatraceEventTypes()
```

#### Response

Generates a dataframe with the table of event types entities (columns: "type", "displayName", "severityLevel", "description").

---

#### Code

```python

dbos.dynatraceEvents()

```


#### Parameters

| Parameter       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Required |
|-----------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `from`          | string | Start of the requested timeframe. Formats include timestamp in UTC milliseconds, human-readable format, or relative timeframe from now (e.g., now-2h). If not set, the relative timeframe of two hours is used (now-2h).                                                                                                                                                                                                                                            | No       |
| `to`            | string | End of the requested timeframe. Formats same as `from`. Default is the current timestamp.                                                                                                                                                                                                                                                                                                                                                                             | No       |
| `eventSelector` | string | Defines the scope of the query. Criteria include Event ID, ID of related entity, Event status, Management zone ID, Event type, Correlation ID, and more. Specify multiple values with commas.                                                                                                                                                                                                                                                                      | No       |
| `entitySelector`| string | Define the entity scope of the query. Must set one of the criteria. Criteria include Entity type, Dynatrace entity ID, Tag, Management zone ID, Management zone name, Entity name, Health state, First seen timestamp, Entity attribute, Relationships, and Negation. Specify multiple criteria with commas.                                                                                                                                                    | No       |

#### Response

Generates a dataframe with the table of event types entities (columns: 'startTime', 'endTime', 'eventType', 'title', 'entityId', 'properties',
       'status', 'underMaintenance', 'frequentEvent').


---

#### Code

```python

dbos.dynatraceProblems()

```
#### Parameters

| Parameter           | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Required |
|---------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `from`              | string  | Start of the requested timeframe. Formats include timestamp in UTC milliseconds, human-readable format (e.g., 2021-01-25T05:57:01.123+01:00), or relative timeframe from now. If no time zone is specified, UTC is used. Use a space character instead of 'T', and seconds/fractions are optional. Relative timeframes format as now-NU/A, where N is the time amount, U is the unit (m, h, d, w, M, y), and A is an alignment. Default is the relative timeframe of two hours (now-2h). | No     |
| `to`                | string  | End of the requested timeframe. Formats same as `from`. If no time zone is specified, UTC is used. Use a space character instead of 'T', and seconds/fractions are optional. Relative timeframes format as now-NU/A. Default is the current timestamp.                                                                                                                                                                                                                                                  | No       |
| `problemSelector`   | string  | Defines the scope of the query for problems. Criteria include Status, Severity level, Impact level, Root cause entity, Management zone ID, Management zone name, Impacted entities, Affected entities, Type of affected entities, Problem ID, Alerting profile ID, Alerting profile name, Entity tags, Display ID, Under maintenance, Text search. Specify multiple criteria with commas. Only results matching all criteria are included in the response.                                                 | No       |

#### Response

Generates a dataframe with the table of event types entities (columns: 'problemId', 'displayId', 'title', 'impactLevel', 'severityLevel',
       'status', 'affectedEntities', 'impactedEntities', 'rootCauseEntity',
       'managementZones', 'entityTags', 'problemFilters', 'startTime',
       'endTime').

---

#### Code

```python

dbos.dynatraceMetrics()

```

#### Parameters

| Parameter           | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Required |
|---------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `from`              | string  | Start of the requested timeframe. Formats include timestamp in UTC milliseconds, human-readable format (e.g., 2021-01-25T05:57:01.123+01:00), or relative timeframe from now. If no time zone is specified, UTC is used. Use a space character instead of 'T', and seconds/fractions are optional. Relative timeframes format as now-NU/A, where N is the time amount, U is the unit (m, h, d, w, M, y), and A is an alignment. Default is the relative timeframe of two hours (now-2h). | No       |
| `to`                | string  | End of the requested timeframe. Formats same as `from`. If no time zone is specified, UTC is used. Use a space character instead of 'T', and seconds/fractions are optional. Relative timeframes format as now-NU/A. Default is the current timestamp.                                                                                                                                                                                                                                                  | No       |
| `metricSelector`    | string  | Selects metrics for the query by their keys. Specify multiple metric keys separated by commas. To select multiple metrics belonging to the same parent, list the last part of the required metric keys in parentheses, separated by commas. Use a trailing asterisk (*) wildcard for full sets of related metrics. Set additional transformation operators separated by a colon (:). Only aggregation, merge, parents, and splitBy transformations are supported. If the metric key contains symbols, quote (") the key and escape quotes and tildes with a tilde (~). For example, "ext:selfmonitoring.jmx.Agents: Type ~"APACHE~"" | Yes      |


#### Response

Generates a dataframe with the table of event types entities (columns: 'timestamps', 'values', 'entity').

---

### **_2. Jira Integration_**

#### Code

```python

dbos.jiraTickets()

```

#### Parameters

| Parameter           | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Required |
|---------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `jql`               | string  | Jira Query Language (JQL) used to filter and retrieve tickets. This query defines the criteria for filtering tickets based on various conditions such as project, status, assignee, etc. The provided JQL expression is required to fetch the desired Jira tickets.                                                                                                                                             | Yes      |
| `Id`                | string  | (Optional) Unique identifier or key for a specific Jira ticket. Use this parameter to retrieve detailed information about a particular ticket instead of a broader query.                                                                                                                                                                                                                                                                                                                              | No       |
| `maintenance`       | string  | (Optional) Parameter used to filter Jira tickets related to a specific type of maintenance. For example, if set to `'Cuarto Mantenimiento Preventivo'`, it filters tickets associated with the specified preventive maintenance type. Adjust the value as needed to narrow down the search based on maintenance criteria.       | No       |  

#### Response

Generates a dataframe with the table of event types entities (columns: 'Id', 'Summary' ,'Issue Type' ,'Status').


---


#### Code

```python

dbos.jiraObjects()

```


#### Response

Generates a dataframe with the table of event types entities (columns: 'CRDD', 'No de serie', 'Respaldo', 'Stack', 'Localidad', 'Estatus',
       'Ip', 'Poliza', 'Contrato', 'Hostname', 'Caracteristicas', 'Sistema',
       'Firmware' ).


---

### **_3. MYSQL_**

#### Code

```python

dbos.MysqlCreateTable()

```

#### Parameters

| Parameter     | Type      | Description                                                                                                               | Required |
|---------------|-----------|---------------------------------------------------------------------------------------------------------------------------|----------|
| table_name     | string    | Name of the table to be created in the MySQL database.                                                                     | Yes      |
| dataframe            | DataFrame | The DataFrame containing the data to be used for creating the MySQL table. It can be the result of dbos methods or custom. | Yes      |


#### Response

Table Create

---

#### Code

```python

dbos.MysqlInsertData()

```

#### Parameters

| Parameter     | Type      | Description                                                                                                               | Required |
|---------------|-----------|---------------------------------------------------------------------------------------------------------------------------|----------|
| table_name     | string    | Name of the table to be created in the MySQL database.                                                                     | Yes      |
| dataframe            | DataFrame | The DataFrame containing the data to be used for creating the MySQL table. It can be the result of dbos methods or custom. | Yes      |


#### Response

Data Append

---

#### Code

```python

dbos.Mysql()

```

#### Parameters

| Parameter      | Type      | Description                                                                                                               | Required |
|-----------------|-----------|---------------------------------------------------------------------------------------------------------------------------|----------|
| query           | string    | An SQL query to be executed on the MySQL database. This parameter is required and should contain valid SQL code for performing the desired operation on the database, such as SELECT, INSERT, UPDATE, or DELETE. | Yes      |


#### Response

Depending on the SQL query you perform, the message you receive will vary.


---

### **4. _Deployed Production_**

#### Code

```python
dbos.CreateCode()
```

#### Parameters

| Parameter      | Type   | Description                                                                                                                | Required |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `file_name`     | string | The name of the Python script file (ending with ".py") to be created.                                                       | Yes      |
| `code`          | string | The Python script code that will be written into the script file.                                                            | Yes      |




#### Response

The code has been exported successfully to (name of bucket) in S3.


---

#### Code 

```python

dbos.CreateWorker()
```

#### Parameters


| Parameter         | Type   | Description                                                                                                              | Required |
|-------------------|--------|--------------------------------------------------------------------------------------------------------------------------|----------|
| `repository`      | string | The name of the Elastic Container Registry (ECR) repository.                                                               | Yes      |
| `file_name`       | string | The name of the Python script file (ending with ".py") created with the `dbos.CreateCode()` method.                      | Yes      |
| `image_tag`       | string | The tag for the Docker image. If not provided, it defaults to "latest".                                                   | No       |
| `region`          | string | The AWS region. If not provided, it defaults to "us-east-1".                                                              | No       |

#### Response

Process completed successfully.

---

#### Code

```python
dbos.CreateLambda()
```




#### Parameters

| Parameter      | Type   | Description                                                                                                           | Required |
|-----------------|--------|-----------------------------------------------------------------------------------------------------------------------|----------|
| `function_name` | string | The name for the Lambda function to be created.                                                                        | Yes      |
| `repository`    | string | The name of the image stored in the Elastic Container Registry (ECR) that will be used for the Lambda function.       | Yes      |


#### Response

Function {function_name} created successfully


---

#### Code

```python

dbos.UpdateLambda()

```

#### Parameters

| Parameter         | Type   | Description                                                                                                             | Required |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------|----------|
| `function_name`   | string | The name of the Lambda function that you want to update.                                                                 | Yes      |
| `repository`      | string | The name of the Elastic Container Registry (ECR) repository where the created image is stored.                           | Yes      |
| `region`          | string | (Optional) The AWS region. If not provided, it defaults to "us-east-1".                                                 | No       |

#### Response

Function Lambda: (function_name) updated with repository: (repository)

---

#### Code


```python

dbos.CreateRunner()

```


#### Parameters

| Parameter         | Type   | Description                                                                                                             | Required |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------|----------|
| `rule_name`       | string | The name you want to give to your Amazon CloudWatch Events rule.                                                          | Yes      |
| `cron_expression` | string | The cron expression that defines the schedule for the rule. For example, "cron(0/5 * * * ? *)" represents a schedule that runs every 5 minutes. Please provide a valid cron expression. | Yes      |
| `function_name`   | string | The name of the Lambda function to which the rule will be added.  

#### Response

CloudWatch Events rule (rule_name) created successfully.

---

## Local Installation

To install `dbos` version 0.0.2, use pip:

```python
pip install git+https://github.com/netjernetworks/dbos.git
```


/*
 * Copyright (C) 2018 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "ct/_when"
], function (declare, d_array, ct_when) {
    return declare([], {
        activate: function () {
            var configAdminService = this._configAdminService;
            var factoryPidQuery = "dn_querybuilder-QueryTools-Factory";
            var bundleIdentifierQuery = "dn_querybuilder";
            var configProps = [
                {
                    "id": "querybuilder_0",
                    "title": "Where is the sky clear?",
                    "iconClass": "icon-globe",
                    "active": true,
                    "storeId": "owm_datastore",
                    "customquery": {
                        "$and": [
                            {
                                "main": {
                                    "$eq": "Clear"
                                }
                            }
                        ]
                    },
                    "options": {
                        "editable": false,
                        "mode": "builder",
                        "count": -1,
                        "ignoreCase": false,
                        "locale": {
                            "language": "en",
                            "country": "EN"
                        }
                    }
                },
                {
                    "id": "querybuilder_1",
                    "title": "Where does the sun shine?",
                    "iconClass": "icon-globe",
                    "storeId": "owm_datastore",
                    "customquery": {
                        "$and": [
                            {
                                "main": {
                                    "$eq": "Clear"
                                }
                            }
                        ]
                    },
                    "options": {
                        "editable": false,
                        "mode": "builder",
                        "count": -1,
                        "ignoreCase": false,
                        "locale": {
                            "language": "en",
                            "country": "EN"
                        }
                    }
                },
                {
                    "id": "querybuilder_2",
                    "title": "Where does it rain?",
                    "iconClass": "icon-cloud",
                    "storeId": "owm_datastore",
                    "customquery": {
                        "$and": [
                            {
                                "main": {
                                    "$eq": "Rain"
                                }
                            }
                        ]
                    },
                    "options": {
                        "editable": false,
                        "mode": "builder",
                        "count": -1,
                        "ignoreCase": false,
                        "locale": {
                            "language": "en",
                            "country": "EN"
                        }
                    }
                },
                {
                    "id": "querybuilder_3",
                    "title": "Where is it warm?",
                    "iconClass": "icon-heart",
                    "storeId": "owm_datastore",
                    "customquery": {
                        "$and": [
                            {
                                "temp": {
                                    "$gte": 25
                                }
                            },
                            {
                                "temp": {
                                    "$lte": 35
                                }
                            },
                            {
                                "humidity": {
                                    "$lte": 50
                                }
                            },
                            {
                                "clouds": {
                                    "$lt": 20
                                }
                            }
                        ]
                    },
                    "options": {
                        "editable": false,
                        "mode": "builder",
                        "count": -1,
                        "ignoreCase": false,
                        "locale": {
                            "language": "en",
                            "country": "EN"
                        }
                    }
                }
            ];
            d_array.forEach(configProps, function (data) {
                var configQuery = configAdminService.createFactoryConfiguration(factoryPidQuery, bundleIdentifierQuery);
                configQuery.update(data);
            });

            var toolsetManager = this._toolsetManager;
            var toolsetDefinition = toolsetManager.toolsetDefinitions;
            toolsetDefinition.push({
                "id": "querytools",
                "title": "OpenWeatherMap Queries",
                "tooltip": "List of predefined questions, click to see the answer",
                "container": "map",
                "window": {
                    "closable": true
                },
                "cssClass": "ctWDYWBtn ctPrimaryInput",
                "max_horizontal": 1,
                "windowType": "dropdown",
                "position": {
                    "rel_t": 100,
                    "rel_l": 20
                },
                "tools": [
                    "querybuilder_*",
                    "userQueryBuilderTool"
                ]
            });
        }
    });
});
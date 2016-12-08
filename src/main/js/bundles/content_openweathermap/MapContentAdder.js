/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
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
    "ct/mapping/map/MapModelInitializer",
    "ct/mapping/mapcontent/MappingResourceRegistryInitializer",
    "dojo/_base/array"
], function (declare, MapModelInitializer, MappingResourceRegistryInitializer, d_array) {
    return declare([], {
        activate: function () {
            // read service settings from properties
            var properties = this._properties;
            var baseLayer = properties.basemap;

            var mrr = this._mappingResourceRegistry;
            var baseLayerRef = baseLayer.id;
            var tmp = {
                services: [baseLayer]
            };
            var mrrInitializer = new MappingResourceRegistryInitializer();
            mrrInitializer.initFromData(tmp, mrr);

            var mapModelDesc = {
                baseLayer: [
                    {
                        layers: ["*"],
                        service: baseLayerRef,
                        enabled: true,
                        id: baseLayerRef
                    }
                ]
            };
            var mmi = new MapModelInitializer();
            var mapModel = this._mapModel;
            var baseLayerChildren = mapModel.getBaseLayer().get("children");
            d_array.forEach(baseLayerChildren, function (layer) {
                layer.set("enabled", false);
            });
            mmi.initMapModelFromData(mapModelDesc, mrr, mapModel);
        },
        deactivate: function () {
            var properties = this._properties;
            var baseLayer = properties.basemap;
            var baseLayerId = baseLayer.id;
            var mapModel = this._mapModel;
            mapModel.removeNodeById(baseLayerId);
            var mrr = this._mappingResourceRegistry;
            var baseLayerResource = mrr.getMappingResourceByUniqueId(baseLayerId);
            mrr.removeMappingResource(baseLayerResource);
            mapModel.fireModelStructureChanged({src: this});
            var baseLayerChildren = mapModel.getBaseLayer().get("children");
            d_array.forEach(baseLayerChildren, function (layer) {
                layer.set("enabled", true);
            });
            mapModel.fireModelStructureChanged({src: this});
        }
    });
});
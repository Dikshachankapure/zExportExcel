sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/model/json/JSONModel"
], function(Controller, Export, exportCSV, jsonModel) {
	"use strict";

	return Controller.extend("poc.controller.Main", {
		onInit: function() {
			
			var oModelJson = this.getOwnerComponent().getModel("ExcelSet");
			this.getView().setModel(oModelJson, "tabAlias");
		},

		// When users click on Export Excel button then this method will call.... 
		handleExcelExport: function() {
			// getting model into oModel variable.
			var oModel = this.getView().getModel("tabAlias");
			var oExport = new Export({
				exportType: new exportCSV({
					// for xls....
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf-8",
					mimeType: "application/vnd.ms-excel"

					// for CSV....
					/* charset: "utf-8",
					fileExtension:"csv",
					separatorChar:",",
					mimeType:"application/csv" */
				}),
				models: oModel,

				rows: {
					path: "/Result"
				},
				columns: [{
					name: "Name",
					template: {
						content: "{name}"
					}
				}, {
					name: "Mobile",
					template: {
						content: "{mobile}"
					}
				}, {
					name: "E-mail",
					template: {
						content: "{mail}"
					}
				}, {
					name: "Address",
					template: {
						content: "{address}"
					}
				}]
			});
			oExport.saveFile().catch(function(oError) {
				sap.m.MessageToast.show("Generate is not possible beause no model was set");
			}).then(function() {
				oExport.destroy();
			});
		}
	});
});
$(document).ready(function(){
  init();
})

const options = {
  collapsed: false,
  withQuotes: true
}

function init() {
  $("#spinner2").hide();
  $(`#model-result`).hide();
  // 既存のデータセットを保存する
  $.ajax({
    type : "GET",
    contentType: "application/json;charset=UTF-8",
    url : "/datasets",
    // data : JSON.stringify(list),
    success : function(result) {
      $("#spinner").hide();
      const list = JSON.parse(result).data;
      var $dataset = $('#dataset');
      for (const dataset of list) {
        $dataset.append(
          `<div class="setinfo"><div class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable" onclick="getDataSetById(${dataset.id})">
              <div class="slds-app-launcher__tile-figure">
                  <span class="slds-avatar slds-avatar_large">
                      <abbr class="slds-avatar__initials slds-icon-custom-27">DataSetId :${dataset.id} </abbr>
                  </span>
                  <div class="slds-m-top_xxx-small"></div>
              </div>
              <div class="slds-app-launcher__tile-body">
                  <a href="javascript:void(0);">
                      <span>Dataset Name : ${dataset.name}</span>
                  </a>
                  <p>TotalExamples :${dataset.totalExamples}  totalLabels:${dataset.totalLabels}</p>
                  <div class="slds-grid slds-wrap">
                    <button class="slds-m-top_xx-small slds-button slds-button_outline-brand" onclick="getModel(${dataset.id})">Model取得</button>
                    <button class="slds-m-top_xx-small slds-button slds-button_outline-brand" onclick="deleteDataSet(${dataset.id})">DataSet削除
                    </button>
              </div>
              </div>

          </div>
          <pre id="dataset-${dataset.id}" class="source slds-box slds-theme_default"></pre></div>
          `
        );
      }

      for (const dataset of list) {
        $(`#dataset-${dataset.id}`).jsonViewer(dataset, options);
      }

    },
    error : function(e){
      $("#spinner").hide();
      console.log(e.status);
      console.log(e.responseText);
    }
  });
}

function getDataSetById(datasetId) {
  $('#ipt-datasetId').val(datasetId);
}

function train(){
  var datasetId = $('#ipt-datasetId').val();
  var modelName = $('#ipt-modelName').val();
  if(datasetId && modelName){
    $.ajax({
      type : "POST",
      url : "/train",
      data : {
        datasetId : datasetId,
        modelName : modelName
      },
      dataType: "json",
      success : function(result) {
        $(`#model-result`).jsonViewer(result, options);
        $(`#model-result`).show();
      },
      error : function(e){
        console.error(e);
      }
    });
  }
}

function getModel(datasetId) {
  var $modelList = $('#modelList');
  $modelList.html('');
  $("#spinner2").show();
  $.ajax({
    type : "GET",
    contentType: "application/json;charset=UTF-8",
    url : `/models/${datasetId}`,
    // data : JSON.stringify(list),
    success : function(result) {
      $("#spinner2").hide();
      const list = JSON.parse(result).data;


      if(list.length == 0) {
        $modelList.append('model が存在しない');
      }

      for (const model of list) {
        $modelList.append(
          `<div class="setinfo"><div class="slds-app-launcher__tile slds-text-link_reset slds-is-draggable">
              <div class="slds-app-launcher__tile-figure">
                  <span class="slds-avatar slds-avatar_large">
                      <abbr class="slds-avatar__initials slds-icon-custom-25">DataSetId :${model.datasetId} </abbr>
                  </span>
                  <div class="slds-m-top_xxx-small"></div>
              </div>
              <div class="slds-app-launcher__tile-body">
                  <a href="javascript:void(0);">
                      <span>Model Name : ${model.name}</span>
                  </a>
                  <p>Model Id : ${model.modelId}</p>
                  <p>modelType :${model.modelType}</p>
                  <div class="slds-grid slds-wrap">
                    <button class="slds-m-top_xx-small slds-button slds-button_outline-brand" onclick="deleteModel(${model.modelId})">Model削除
                    </button>
              </div>
              </div>

          </div>
          <pre id="model-${model.modelId}" class="source slds-box slds-theme_default"></pre></div>
          `
        );
      }

      for (const model of list) {
        $(`#model-${model.modelId}`).jsonViewer(model, options);
      }

    },
    error : function(e){
      $("#spinner2").hide();
      console.log(e.status);
      console.log(e.responseText);
    }
  });
}
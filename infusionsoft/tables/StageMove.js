module.exports = StageMove = require('typedef')

// THIS CODE WAS GENERATED BY AN AUTOMATED TOOL. Editing it is not recommended.
// For more information, see http://github.com/bvalosek/grunt-infusionsoft
// Generated on Wed Jan 08 2014 12:43:55 GMT-0600 (CST)

// This table holds historic data of opportunities being moved from one stage to
// another.
.class('StageMove') .define({

    __static__field__primary__number__read__Id:
        'Id',

    __static__field__number__read__OpportunityId:
        'OpportunityId',

    __static__field__datetime__read__MoveDate:
        'MoveDate',

    __static__field__number__read__MoveToStage:
        'MoveToStage',

    __static__field__number__read__MoveFromStage:
        'MoveFromStage',

    __static__field__datetime__read__PrevStageMoveDate:
        'PrevStageMoveDate',

    __static__field__number__read__CreatedBy:
        'CreatedBy',

    __static__field__datetime__read__DateCreated:
        'DateCreated',

    __static__field__number__read__UserId:
        'UserId'

});
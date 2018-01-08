/**
 * Created by tangwenpei on 16/5/20.
 */
define(['./module'], function (directives) {
    'use strict';

    //多选按钮选择
    directives.directive('allCheckbox', function ($compile) {
        return {
            restrict: 'A',
            //scope: false,
            link: function ($scope, $element) {
                var tbody = $element.parents('thead:first').next();
                $element.click(function () {
                    var th = $(this);
                    if (th.prop('checked') == true) {
                        tbody.find(":checkbox").prop('checked', true);
                    } else {
                        tbody.find(":checkbox").prop('checked', false);
                    }
                    $scope.StatisticsSelected();
                })

                $(document).on('click', 'tbody :checkbox', function () {
                    $scope.StatisticsSelected();
                    tbody.find(":checkbox").each(function () {
                        if ($(this).prop("checked") == false) {
                            $element.prop('checked', false);
                            return false;
                        } else {
                            $element.prop('checked', true);
                        }
                    });
                })

                $scope.StatisticsSelected = function () {
                    var count = 0.00;
                    var record = 0;
                    tbody.find("input[type='checkbox']:checked").parent('td').each(function () {
                        var th = $(this).siblings(":last").text();
                        count += parseFloat(th == '' ? 0 : th, 2);
                        record++;
                    })

                    count = parseFloat(count, 2);

                    $scope.$apply(function () {
                        $scope.recordCount = record;
                        $scope.amountCount = count;
                    })

                }
            }
        }
    })
});
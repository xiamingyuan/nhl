/**
 * Created by apple on 2017/5/4.
 */
Ext.define('NhlApp.view.business.famousdoctor.famousdoctoradd.FamousDoctorAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.business_famousdoctoradd',
    data: {
        selectDisease:'未选择疾病',
        selectDoctor:'未选择医生',
        AllSelectedRecords:[],
        selectDiseaseRecord:[],
        errorInfor:''
    }
});
module.exports = {
    pathToJenkins: 'http://192.168.99.100:32769/job/build1/lastBuild/api/json',
    latestBuildFile: './latestBuild.js',
    debug: true,
    silent: false,
    lightsOff: false,
    debugInfo: {
        fail: '{"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userId":null,"userName":"anonymous"}]}],"artifacts":[],"building":false,"description":null,"displayName":"#18","duration":20061,"estimatedDuration":20030,"executor":null,"fullDisplayName":"build1 #18","id":"18","keepLog":false,"number":18,"queueId":1,"result":"FAILURE","timestamp":1457383706653,"url":"http://192.168.99.100:32769/job/build1/18/","builtOn":"","changeSet":{"items":[],"kind":null},"culprits":[]}',
        pass: '{"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userId":null,"userName":"anonymous"}]}],"artifacts":[],"building":true,"description":null,"displayName":"#18","duration":20061,"estimatedDuration":20030,"executor":null,"fullDisplayName":"build1 #18","id":"18","keepLog":false,"number":18,"queueId":1,"result":"FAILURE","timestamp":1457383706653,"url":"http://192.168.99.100:32769/job/build1/18/","builtOn":"","changeSet":{"items":[],"kind":null},"culprits":[]}',
        inprog: '{"actions":[{"causes":[{"shortDescription":"Started by user anonymous","userId":null,"userName":"anonymous"}]}],"artifacts":[],"building":false,"description":null,"displayName":"#18","duration":0,"estimatedDuration":20030,"executor":null,"fullDisplayName":"your test in progress","id":"inprog","keepLog":false,"number":"inprog","queueId":1,"result":"FAILURE","timestamp":1457383706653,"url":"http://192.168.99.100:32769/job/build1/18/","builtOn":"","changeSet":{"items":[],"kind":null},"culprits":[]}',
        response: function () { return this.pass },
    }
}
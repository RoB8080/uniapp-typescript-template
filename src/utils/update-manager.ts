export const setUpdateManager = () => {
    const updateManager = uni.getUpdateManager()

    // 检测新版回调
    updateManager.onCheckForUpdate((res: any) => {
        console.log(res.hasUpdate)
    })

    // 新版下载完成回调
    updateManager.onUpdateReady(() => {
        uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启以应用更新?',
            success(res) {
                if (res.confirm) {
                // 应用新版本并重启
                    updateManager.applyUpdate()
                }
            }
        })
    })

    // 新版下载失败回调
    updateManager.onUpdateFailed(() => {
    })
}

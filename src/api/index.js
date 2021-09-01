const baseUrl = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

export const request = async (nodeId) => {
    try {
        let response = await fetch(`${baseUrl}/${nodeId != '' ? nodeId : ''}`)
        if(response.ok) {
            return await response.json()
        } else {
            throw new Error('서버 오류')
        }
    } catch(e) {
        throw new Error(`오류 : ${e.message}`)
    }    
}

const pathPrefix = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default function ImageViewer({$app, imagePath, onClick}) {
    this.imagePath = imagePath
    this.$target = document.createElement('div')
    this.$target.className = 'Modal ImageViewer'
    $app.appendChild(this.$target)

    this.setImage = (imagePath) => {
        this.imagePath = imagePath
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
        <div class="content">
            ${this.imagePath? `<img src="${pathPrefix}${this.imagePath}"></img>` : ""}
        </div>
        `
        this.$target.style.display = this.imagePath? 'block' : 'none'
    }
    
    window.addEventListener('keyup', (e) => {
        if(e.code === 'Escape') {
            this.setImage(null)
        }
    })
    this.$target.addEventListener('click', (e) => {
        if(e.target === e.currentTarget) {
            this.setImage(null)
        }
    })

    this.render()
}
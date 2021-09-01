export default function Loading({$app, isShow}) {
    this.$target = document.createElement('div')
    this.$target.className = 'Modal Loading'
    this.$target.innerHTML = `<div class="content">
            <img src="./assets/nyan-cat.gif">
        </div>`
    $app.appendChild(this.$target)

    this.isShow = isShow

    this.setIsShow = (isShow) => {
        this.isShow = isShow
        this.render()
    }
    this.render = () => {
        this.$target.style.display = this.isShow ? 'block' : 'none' 
    }
    this.render()
}
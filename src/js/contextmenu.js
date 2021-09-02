export default function Contextmenu ({$app, initState, onClick}) {
    this.$target = document.createElement('div')
    this.$target.className = "custom-context-menu"
    $app.appendChild(this.$target)

    this.state = initState
    this.onClick = onClick

    this.setState = (state) => {
        if(this.state.menus === state.menus) {
            this.state = state
            this.render()
        } else {
            this.state = state
            this.init()
            this.render()
        }
    }

    this.init = () => {
        const menuItems = this.state.menus.map(menu => {
            return `<li data-name="${menu}"><a>${menu}</a></li>`
        }).join('')
        this.$target.innerHTML = `<ul>${menuItems}</ul>`
        this.render()
    }

    this.render = () => {
        if(this.state.isShow) {
            this.$target.style.top = this.state.menuStyle.top
            this.$target.style.left = this.state.menuStyle.left
            this.$target.style.display = "block"
        } else {
            this.$target.style.display = "none"
        }
    }

    this.$target.addEventListener("click", (e) => {
        const $menu = e.target.closest('li')
        if($menu) {
            const selectedMenu = $menu.dataset.name
            this.onClick(selectedMenu)
        }
    })

    this.init()
}
import Contextmenu from './contextmenu.js'
export default function ContextmenuApp($app) {
    this.state = {
        menus: ["copy", "paste", "cancel"],
        selectedNode: undefined,
        isShow: false,
        menuStyle: {
            top: 0,
            left: 0
        }
    }

    const contextmenu = new Contextmenu({
        $app,
        initState: this.state,
        onClick: (selectedMenu) => {
            if (selectedMenu) {
                console.log(this.state.selectedNode, selectedMenu)
                this.state.selectedNode = undefined
                this.state.isShow = false
                contextmenu.setState(this.state)
            }
        }
    })

    const init = () => {
        console.log("init")
        $app.addEventListener("contextmenu", (e) => {
            let isRightButton = false
            if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                isRightButton = e.which == 3
            else if ("button" in e)  // IE, Opera 
                isRightButton = e.button == 2;
            const $node = e.target.closest('.img-box')
            
            if ($node && isRightButton) {
                e.preventDefault();
                this.state.selectedNode = $node
                this.state.isShow = true
                contextmenu.setState({
                    ...this.state,
                    menuStyle: {
                        top: e.pageY+'px',
                        left: e.pageX+'px'
                    }
                })
            }
        })
        $app.addEventListener("click", (e) => {
            if(this.state.isShow) {
                console.log('닫기')
                this.state.isShow = false
                this.state.selectedNode = undefined
                contextmenu.setState(this.state)
            }
        })
    }

    init()
}
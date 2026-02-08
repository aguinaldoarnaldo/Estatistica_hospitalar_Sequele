import Account_Security from "./Account_Security/Account_Security"
import Preferences from "./Preferences/Preferences"
import Support from "./Support/Support"
import Profile from "./Profile/Profile"
import { useState } from "react"
import style from './Settings.module.css'

// telas
const screen = Array(<Account_Security />, <Preferences />, <Support />, <Profile />)


export default function Settings() {
    // hook for handle display of screen
    const [current_screen, setcurrent_screen] = useState(3)

    return (
        <>
            <main className={style.main}>
                <section className={style.SideBar}>
                    <button onClick={()=>setcurrent_screen(3)}>Perfil</button>
                    <button onClick={()=>setcurrent_screen(1)}>Preferencias</button>
                    <button onClick={()=>setcurrent_screen(0)}>Conta e Segurança</button>
                    <button onClick={()=>setcurrent_screen(2)}>Suporte e Informações</button>
                </section>
                <section className={style.screen}>
                    {
                        screen[current_screen]
                    }
                </section>


            </main>
        </>
    )

}


/*


# Especificação da Tela de Configurações (Settings)

## 📱 Visão Geral
A tela de Configurações permite que o usuário gerencie seu perfil, preferências de interface, segurança da conta e acesse o suporte. O layout deve ser limpo, utilizando uma estrutura de lista vertical.

---

## 🛠 Estrutura da UI

### 1. Cabeçalho do Perfil (Profile Header)
* **Componente:** `View` com `Image` (Avatar) e `Text`.
* **Elementos:**
    * Foto de Perfil (Avatar circular).
    * Nome do Usuário.
    * E-mail ou Telefone.
    * **Ação:** Botão "Editar Perfil" (Navega para `EditProfile`).

### 2. Preferências (Preferences)
Configurações locais que afetam a experiência do usuário no app.

| Item | Tipo de Componente | Ação/Descrição |
| :--- | :--- | :--- |
| **Notificações** | `Switch` | Habilitar/Desabilitar push notifications. |
| **Modo Escuro** | `Switch` | Alternar entre tema Light/Dark. |
| **Idioma** | `Modal` ou `Picker` | Seleção (Português/Inglês). |

### 3. Logística e Endereços (Específico para Entregas)
Gerenciamento de dados essenciais para o funcionamento do delivery.

* **Meus Endereços:** Lista de endereços salvos (Casa, Trabalho).
* **Veículos:** (Apenas para Entregadores) Gerenciar moto/carro cadastrado.

### 4. Conta e Segurança (Account & Security)
* **Alterar Senha:** Navegação para formulário de nova senha.
* **Autenticação em 2 Etapas:** `Switch` para segurança extra.
* **Privacidade:** Link para configurações de visibilidade.

### 5. Suporte e Informações (Support)
* **Central de Ajuda:** Link para FAQ ou Chat.
* **Termos de Uso:** Link para WebView com os termos legais.
* **Sobre o App:** Exibir
*/
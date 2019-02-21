import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { NgModule } from '../../node_modules/@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { OtpComponent } from './otp/otp.component';
import { CbhomeComponent } from './CashBlast/cbhome/cbhome.component';
import { AuthGuard } from './auth.guard';
import { GamedashboardComponent } from './gamedashboard/gamedashboard.component';
import { CblooserComponent } from './CashBlast/cblooser/cblooser.component';
import { CbHowtoplayComponent } from './CashBlast/cbhowtoplay/cbhowtoplay.component';
import { OpponentComponent } from './CashBlast/opponent/opponent.component';
import { QuestionComponent } from './CashBlast/question/question.component';
import { ScoreboardComponent } from './CashBlast/scoreboard/scoreboard.component';
import { NetworkerrorComponent } from './networkerror/networkerror.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TrnsRedirectComponent } from './CashBlast/trns-redirect/trns-redirect.component';
import { SpinthewheelComponent } from './SpinTheWheel/spinthewheel/spinthewheel.component';
import { QwhomeComponent } from './QuickWin/qwhome/qwhome.component';
import { QwquestionComponent } from './QuickWin/qwquestion/qwquestion.component';
import { LooserComponent } from './QuickWin/looser/looser.component';
import { WinnerComponent } from './QuickWin/winner/winner.component';
import { QwtcComponent } from './QuickWin/qwtc/qwtc.component';
import { HelpComponent } from './QuickWin/help/help.component';
import { QwpastwinnerComponent } from './QuickWin/qwpastwinner/qwpastwinner.component';
import { PoolhomeComponent } from './PoolPrize/poolhome/poolhome.component';
import { PoolquestionComponent } from './PoolPrize/poolquestion/poolquestion.component';
import { PooltwinnerscoreboardComponent } from './PoolPrize/pooltwinnerscoreboard/pooltwinnerscoreboard.component';
import { PooltlooserscoreboardComponent } from './PoolPrize/pooltlooserscoreboard/pooltlooserscoreboard.component';
import { PooltcComponent } from './PoolPrize/pooltc/pooltc.component';
import { PoolfaqComponent } from './PoolPrize/poolfaq/poolfaq.component';
import { PooltipsandtricsComponent } from './PoolPrize/pooltipsandtrics/pooltipsandtrics.component';
import { PoolpastwinnerComponent } from './PoolPrize/poolpastwinner/poolpastwinner.component';
import { PoolwinnerComponent } from './PoolPrize/poolwinner/poolwinner.component';
import { BlogComponent } from './blog/blog.component';
import { PopupComponent } from './popup/popup.component';
import { RulesComponent } from './CashBlast/rules/rules.component';
import { TermandconditionComponent } from './CashBlast/termandcondition/termandcondition.component';
import { SupportComponent } from './support/support.component';
import { CouponComponent } from './coupon/coupon.component';
import { RedeemComponent } from './redeem/redeem.component';
import { FaqComponent } from './faq/faq.component';
import { QwfaqComponent } from './QuickWin/qwfaq/qwfaq.component';
import { MshomeComponent } from './MegaShark/mshome/mshome.component';
import { PacklistComponent } from './MegaShark/packlist/packlist.component';
import { BoostermodeComponent } from './MegaShark/boostermode/boostermode.component';
import { NormalmodeComponent } from './MegaShark/normalmode/normalmode.component';
import { MsscoreboardComponent } from './MegaShark/msscoreboard/msscoreboard.component';
import { MspastwinnerComponent } from './MegaShark/mspastwinner/mspastwinner.component';
import { SpwwinnerComponent } from './SpinTheWheel/spwwinner/spwwinner.component';
import { SpwhomeComponent } from './SpinTheWheel/spwhome/spwhome.component';

const routes: Routes = [


  { path: "dashboard", component: GamedashboardComponent, canActivate: [AuthGuard]  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  
  
  { path: "register", component: RegistrationComponent },
  { path: "otp", component: OtpComponent },
  { path: "dashboard/blog", component: BlogComponent },
  { path: "dashboard/coupon", component: CouponComponent },
  { path: "dashboard/redeem", component: RedeemComponent },
  { path: "dashboard/popup", component: PopupComponent },
  { path: "dashboard/faq", component: FaqComponent },
  { path: "dashboard/cashblast", component: CbhomeComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard]},
  { path: "dashboard/tc", component: TermandconditionComponent },
  { path: "dashboard/cashblast/rules", component: RulesComponent },
  { path: "dashboard/cashblast/help", component: HelpComponent },
  { path: "dashboard/support", component: SupportComponent },
  { path: "dashboard/cashblast/cblooser", component: CblooserComponent , canDeactivate: [AuthGuard]},
  { path: "dashboard/cashblast/cbhowtoplay", component: CbHowtoplayComponent },
  { path: "dashboard/cashblast/opponent", component: OpponentComponent, canActivate: [AuthGuard] , canDeactivate: [AuthGuard]},
  { path: "dashboard/cashblast/opponent/playquestion", component: QuestionComponent, canActivate: [AuthGuard] , canDeactivate: [AuthGuard]},
  { path: "dashboard/cashblast/opponent/playquestion/scoreboard", component: ScoreboardComponent , canDeactivate: [AuthGuard]},
   { path: "dashboard/spinthewheel", component: SpinthewheelComponent },
  { path: "dashboard/quickwin", component: QwhomeComponent , canDeactivate: [AuthGuard]},
  { path: "dashboard/quickwin/question", component: QwquestionComponent  , canDeactivate: [AuthGuard] },
  { path: "dashboard/quickwin/question/looser", component: LooserComponent, canDeactivate: [AuthGuard] },
  { path: "dashboard/quickwin/question/winner", component: WinnerComponent, canDeactivate: [AuthGuard] },
  { path: "dashboard/quickwin/tc", component: QwtcComponent },
  { path: "dashboard/quickwin/help", component: HelpComponent },
  { path: "dashboard/quickwin/faq", component: QwfaqComponent },
  { path: "dashboard/quickwin/pastwinner", component: QwpastwinnerComponent },
  { path: "dashboard/megashark", component: MshomeComponent , canActivate: [AuthGuard]},
  { path: "dashboard/megashark/packlist", component: PacklistComponent, canActivate: [AuthGuard] },
  { path: "dashboard/megashark/packlist/normalmode", component: NormalmodeComponent , canActivate: [AuthGuard]},
  { path: "dashboard/megashark/packlist/boostermode", component: BoostermodeComponent , canActivate: [AuthGuard]},
  { path: "dashboard/megashark/scoreboard", component: MsscoreboardComponent , canActivate: [AuthGuard]},
  { path: "dashboard/megashark/packlist/pastwinner", component: MspastwinnerComponent , canActivate: [AuthGuard]},
  { path: "dashboard/poolprice", component: PoolhomeComponent  , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize", component: PoolhomeComponent  , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize/question", component: PoolquestionComponent  , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize/question/winnerscore", component: PooltwinnerscoreboardComponent , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize/question/looserscore", component: PooltlooserscoreboardComponent , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize/question/winners", component: PoolwinnerComponent , canDeactivate: [AuthGuard]},
  { path: "dashboard/poolprize/tc", component: PooltcComponent },
  { path: "dashboard/poolprize/faq", component: PoolfaqComponent },
  { path: "dashboard/poolprize/tips", component: PooltipsandtricsComponent },
  { path: "dashboard/poolprize/pastwinner", component: PoolpastwinnerComponent },  
  { path: "dashboard/spinthewheel/spinwinner", component:SpwwinnerComponent},
  { path: "dashboard/spinthewheelhome", component: SpwhomeComponent },
  { path: "paytm", component: TrnsRedirectComponent },
  { path: "networkerror", component: NetworkerrorComponent },
  { path: "**", component: PagenotfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true ,useHash:true} // <-- debugging purposes only
    )

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

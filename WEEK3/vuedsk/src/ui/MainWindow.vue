<template>
  <Window v-bind:title='title' width="720" height="360" margined v-on:show="show" menu="true" v-on:close="exit">
    <Box stretchy padded>
      <Box horizontal padded>
      <Group title="Search" margined>
      <Box padded>
                  <Form label="SearchForm" padded>
            <Group>
                <Box horizontal padded>
                    <RadioButtons horizontal v-bind:items="[ 'by Name', 'by Phone', 'by Email' ]" v-model="radio"/>
                    <TextInput label="Search:" v-model="search"/>
                    <Button @click="searchit">Search</Button>
            </Box>
          </Group>
                    <Button @click="newuser" v-bind:enabled="!isnewuser">New contact</Button>
              </Form>
      </Box>
    </Group> 
    <Group v-bind:title="searchtitle" margined >
      <Box padded>
            <Form label="Form" padded>
              <TextInput label="First name:" v-model="fname" v-bind:readonly="readonly"/>
              <TextInput label="Last name:" v-model="lname" v-bind:readonly="readonly"/>
              <Group title="Date of birth" margined >
                <Box horizontal padded>
                  <DropdownList  stretchy v-bind:items="days" v-model="day" v-bind:enabled="!readonly"/>
                  <DropdownList  stretchy v-bind:items="months" v-model="month" v-bind:enabled="!readonly"/>
                  <DropdownList  stretchy v-bind:items="years" v-model="year" v-bind:enabled="!readonly"/>
                </Box>
            </Group>
              <TextInput label="Phone:" v-model="phone" v-bind:readonly="readonly"/>
              <TextInput label="Email:" v-model="email" v-bind:readonly="readonly"/>
              <DropdownList label="Location" stretchy v-bind:items="districts" v-model="item" v-bind:enabled="!readonly"/>
              <Box horizontal padded>
                <Button @click="init" v-bind:enabled="!readonly" v-bind:visible="issave">       Cancel       </Button>
                <Button @click="edit" v-bind:enabled="!readonly" v-bind:visible="isedit">         Edit      </Button>
                <Button @click="save" v-bind:enabled="!readonly" v-bind:visible="issave">         Save      </Button>
              </Box>
            </Form>

      </Box>
    </Group>
    </Box>  
          <Group stretchy margined >
            <TextInput v-model="message" readonly/>
          </Group>
    </Box>  
  </Window>
</template>

<script src="../code/mainwindow.js"></script>